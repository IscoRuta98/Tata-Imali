#pragma version 8

# Global state schema: 2 units, 0 bytes
# Local state schema: 0 uints, 0 bytes

# Box size: 5 + 8 + 10 + 8: 31 bytes
# Key size: 32 bytes (Algorand Public Key)
# Global state keys
# MBR:  2500 + 400 * (box_size + key_size) = 27700 MicroAlgos

# Box Storage keys
struct UserLoanInfo:
    # hasCurrentLoan: 0=false, 1=true
    hasCurrentLoan: int
    loanAmount: int
    repaymentDate: bytes[10]
    loanRepaymentAmount: int
end

# Global state keys
const bytes ASSET_ID = "asset_id"
const bytes USERS = "users"

if Txn.ApplicationID == 0:
app_global_put(USERS, 0)
    exit(1)
end

switch Txn.OnCompletion:
    NoOp: main
    OptIn: opt_in
    CloseOut: close_out
    UpdateApplication: update_app
    DeleteApplication: delete_app
end

block opt_in:
    # Create a payment txn to cover MBR for boxes
    assert(Gtxn[-1].TypeEnum == Pay)
    assert(Gtxn[-1].Sender == Txn.Sender)
    assert(Gtxn[-1].Receiver == Global.CurrentApplicationAddress)
    assert(Gtxn[-1].Amount >= 27700)

    # Create & initialize box to store UserLoanInfo
    int hasCurrentLoan = 0
    int loanAmount = 0
    bytes repaymentDate = ''
    int loanRepaymentAmount = 0

    box<UserLoanInfo> info_box = CreateBox(Txn.Sender)
    info_box.hasCurrentLoan = hasCurrentLoan
    info_box.loanAmount = loanAmount
    info_box.repaymentDate = repaymentDate
    info_box.loanRepaymentAmount = loanRepaymentAmount

    app_global_put(USERS, app_global_get(USERS) + 1)
    exit(1)
end

block close_out:
    app_global_put(USERS, app_global_get(USERS) - 1)
    exit(1)
end

block update_app:
    exit(Txn.Sender == Global.CreatorAddress)
end

block delete_app:
    exit(Txn.Sender == Global.CreatorAddress)
end

block main:
    switch Txn.ApplicationArgs[0]:
        "issue_asa": issue_asa
        "grant_loan": grant_loan
        "receive_loan_repayment": receive_loan_repayment
    end

    block issue_asa:
        assert(Txn.Sender == Global.CreatorAddress)
        assert(app_global_get(ASSET_ID) == 0)

        inner_txn:
            TypeEnum: Acfg
            Sender: Global.CurrentApplicationAddress
            ConfigAssetTotal: btoi(Txn.ApplicationArgs[1])
            # set it to 2 decimals to work with cents
            ConfigAssetDecimals: 2
            ConfigAssetDefaultFrozen: 0
            ConfigAssetUnitName: Txn.ApplicationArgs[2]
            ConfigAssetName: Txn.ApplicationArgs[3]
            ConfigAssetManager: Global.CurrentApplicationAddress
            Fee: 0
        end

        app_global_put(ASSET_ID, Itxn.CreatedAssetID)
        log(itob(Itxn.CreatedAssetID))
        exit(1)
    end

    block grant_loan:
        int loanAmount = btoi(Txn.ApplicationArgs[1])
        bytes repaymentDate = Txn.ApplicationArgs[2]
        int loanRepaymentAmount = loanAmount
        
        box<UserLoanInfo> info_box = OpenBox(Txn.Sender)
        assert(info_box.hasCurrentLoan == 0)

        inner_txn:
            TypeEnum: Axfer
            Sender: Global.CurrentApplicationAddress
            XferAsset: app_global_get(ASSET_ID)
            AssetAmount: loanAmount
            AssetReceiver: Txn.Sender
            Fee: 0
        end

        info_box.hasCurrentLoan = 1
        info_box.loanAmount = loanAmount
        info_box.repaymentDate = repaymentDate
        info_box.loanRepaymentAmount = loanRepaymentAmount

        exit(1)
    end

    block receive_loan_repayment:

        box<UserLoanInfo> info_box = OpenBox(Txn.Sender)

        assert(Gtxn[-1].TypeEnum == Axfer)
        assert(Gtxn[-1].Sender == Txn.Sender)
        # assert(Gtxn[-1].AssetReceiver == Global.CurrentApplicationAddress)

        if Gtxn[-1].AssetAmount <= info_box.loanRepaymentAmount:
            info_box.loanRepaymentAmount = info_box.loanRepaymentAmount - Gtxn[-1].AssetAmount
        else:
            info_box.loanRepaymentAmount = 0
            info_box.loanAmount = 0
            info_box.hasCurrentLoan = 0
        end
        
        exit(1)
    end

    exit(1)
end
# Smart Contract development

This repositroy includes code used to develop an Algorand smart contract that handles the logic for the microfinance platform.

\
`approval.tl`: The actual smart contract containing the logic for Tata-Imali platform. The smart contract is written in [Tealish](https://tealish.tinyman.org/en/latest/).
`deploy.py`: Python script that deploys the smart contract.
`app.py`: Contains helper functions for deploying Algorand smart contract on testnet.
`issue_asa.py`: Python script that issues stable coins for a particular currency. Only the creator of smart contract can issue Algorand Standard Assets(ASAs).
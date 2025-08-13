// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title BINToken
 * @dev 社区专用代币：
 *  1. 网站一次性空投 300 BIN
 *  2. 爱发电等级奖励（初级 1000 / 中级 2000 / 高级 3000）
 *  3. Owner 可增发
 *  - 精度固定为 2 位小数
 */
contract BINToken is ERC20, Ownable {
    mapping(address => bool) public claimedWebsite;

    enum AfdianTier { None, Primary, Middle, Advanced }

    event WebsiteClaim(address indexed user, uint256 amount);
    event AfdianClaim(address indexed user, AfdianTier tier, uint256 amount);

    /**
     * @dev 构造函数：初始发行 1000 万 BIN 到部署者
     */
    constructor() ERC20("Bin Token", "BIN") Ownable(msg.sender) {
        _mint(msg.sender, 10_000_000 * 10 ** decimals());
    }

    function decimals() public pure override returns (uint8) {
        return 2;
    }

    function claimFromWebsite() external {
        require(!claimedWebsite[msg.sender], "Already claimed from website");
        claimedWebsite[msg.sender] = true;
        _mint(msg.sender, 300 * 10 ** decimals());
        emit WebsiteClaim(msg.sender, 300 * 10 ** decimals());
    }

    function grantAfdianTier(address to, AfdianTier tier) external onlyOwner {
        require(tier != AfdianTier.None, "Invalid tier");

        uint256 amount;
        if (tier == AfdianTier.Primary) {
            amount = 1000;
        } else if (tier == AfdianTier.Middle) {
            amount = 2000;
        } else if (tier == AfdianTier.Advanced) {
            amount = 3000;
        }

        _mint(to, amount * 10 ** decimals());
        emit AfdianClaim(to, tier, amount * 10 ** decimals());
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount * 10 ** decimals());
    }
}

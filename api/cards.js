const fetch = require('node-fetch');

const img2DataURL = url => {
    return fetch(url).then(res => res.buffer()).then(buffer => `data:image/png;base64,${buffer.toString('base64')}`);
};

const SSCards = async (data, pp500) => {
    const preURL = "https://github.com/DetegiCE/Github-Readme-ScoreSaber/blob/main/assets/img/bs_";
    const sufURL = ".png?raw=true";

    let blockImage;
    const playerRank = data.playerInfo.rank;

    if (data.playerInfo.banned === 1) blockImage = "banned";
    else if (playerRank === 0) blockImage = "zero";
    else if (playerRank <= 100) blockImage = "swordmaster";
    else if (playerRank <= pp500 / 100) blockImage = "master";
    else if (playerRank <= pp500 / 20) blockImage = "diamond";
    else if (playerRank <= pp500 / 10) blockImage = "platinum";
    else if (playerRank <= pp500 / 3 * 10) blockImage = "gold";
    else if (playerRank <= pp500 / 2) blockImage = "silver";
    else blockImage = "bronze";

    const blockBase64 = await img2DataURL(preURL + blockImage + sufURL);

    console.log('LOADED');

    return `
    <svg width="730" height="260" viewBox="0 0 730 260" 
         xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="bronze" x1="0" x2="100%" y1="0" y2="100%"
                        gradientUnits="userSpaceOnUse" gradientTransform="rotate(45)">
          <stop stop-color="#4F1E00" offset="0%" />
          <stop stop-color="#752F00" offset="50%" />
          <stop stop-color="#8D3A03" offset="100%" />
        </linearGradient>
        <linearGradient id="silver" x1="0" x2="100%" y1="0" y2="100%"
                        gradientUnits="userSpaceOnUse" gradientTransform="rotate(45)">
          <stop stop-color="#757F9A" offset="0%" />
          <stop stop-color="#D7DDE8" offset="100%" />
        </linearGradient>
        <linearGradient id="gold" x1="0" x2="100%" y1="0" y2="100%"
                        gradientUnits="userSpaceOnUse" gradientTransform="rotate(45)">
          <stop stop-color="#F37335" offset="0%" />
          <stop stop-color="#FDC830" offset="100%" />
        </linearGradient>
        <linearGradient id="platinum" x1="0" x2="100%" y1="0" y2="100%"
                        gradientUnits="userSpaceOnUse" gradientTransform="rotate(45)">
          <stop stop-color="#0CEBEB" offset="0%" />
          <stop stop-color="#20E3B2" offset="50%" />
          <stop stop-color="#29FFC6" offset="100%" />
        </linearGradient>
        <linearGradient id="diamond" x1="0" x2="100%" y1="0" y2="100%"
                        gradientUnits="userSpaceOnUse" gradientTransform="rotate(45)">
          <stop stop-color="#5B86E5" offset="0%" />
          <stop stop-color="#36D1DC" offset="100%" />
        </linearGradient>
        <linearGradient id="master" x1="0" x2="100%" y1="0" y2="100%"
                        gradientUnits="userSpaceOnUse" gradientTransform="rotate(45)">
          <stop stop-color="#9733EE" offset="0%" />
          <stop stop-color="#DA22FF" offset="100%" />
        </linearGradient>
        <linearGradient id="swordmaster" x1="0" x2="100%" y1="0" y2="100%"
                        gradientUnits="userSpaceOnUse" gradientTransform="rotate(45)">
          <stop stop-color="#12C2E9" offset="0%" />
          <stop stop-color="#C471ED" offset="50%" />
          <stop stop-color="#F64F59" offset="100%" />
        </linearGradient>
        <linearGradient id="zero" x1="0" x2="100%" y1="0" y2="100%"
                        gradientUnits="userSpaceOnUse" gradientTransform="rotate(45)">
          <stop stop-color="#000000" offset="0%" />
          <stop stop-color="#404040" offset="100%" />
        </linearGradient>
        <linearGradient id="banned" x1="0" x2="100%" y1="0" y2="100%"
                        gradientUnits="userSpaceOnUse" gradientTransform="rotate(45)">
          <stop stop-color="#200122" offset="0%" />
          <stop stop-color="#6F0000" offset="100%" />
        </linearGradient>
      </defs>
      <rect stroke="#EAEAEA" fill="#FFFFFF" x="0.5" y="0.5" width="729" height="259" rx="5" />
      <g transform="translate(40 49)" stroke-linecap="square">
        <image width="162" height="162" xlink:href="${blockBase64}" />
      </g>
      <g transform="translate(270 79)">
        <text font-family="Arial" font-size="30">
          ${data.playerInfo.playerName}
        </text>
      </g>
      <g transform="translate(270 143)">
        <text fill="url(#${blockImage})" font-family="Arial" font-weight="bold" font-size="54">
          ${data.playerInfo.pp} pp
        </text>
      </g>
    </svg>
    `;
};

module.exports = SSCards;

const fetch = require('node-fetch');

const img2DataURL = url => {
  return fetch(url).then(res => res.buffer()).then(buffer => `data:image/png;base64,${buffer.toString('base64')}`);
};

const replaceAll = (str, searchStr, replaceStr) => {
  if (str.indexOf(searchStr) === -1) return str;
  else return str.split(searchStr).join(replaceStr);
};

const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const SSCards = async (data, pp500) => {
  const preURL = "https://github.com/DetegiCE/Github-Readme-ScoreSaber/blob/main/assets/img/bs_";
  const sufURL = ".png?raw=true";

  let blockImage;
  const playerRank = data.playerInfo.rank;
  let rankPercent = -1;

  if (data.playerInfo.banned === 1) blockImage = "banned";
  else if (playerRank === 0) blockImage = "zero";
  else if (playerRank <= 100) blockImage = "swordmaster";
  else if (playerRank <= pp500 * 0.01) blockImage = "master";
  else if (playerRank <= pp500 * 0.05) blockImage = "diamond";
  else if (playerRank <= pp500 * 0.1) blockImage = "platinum";
  else if (playerRank <= pp500 * 0.3) blockImage = "gold";
  else if (playerRank <= pp500 * 0.5) blockImage = "silver";
  else blockImage = "bronze";


  if (data.playerInfo.banned === 1) rankPercent = "INVALID";
  else if (playerRank === 0) rankPercent = "INVALID";
  else {
    rankPercent = (playerRank / pp500 * 100).toFixed(2);
  }

  const blockBase64 = await img2DataURL(preURL + blockImage + sufURL);

  console.log('LOADED');

  let playerName = data.playerInfo.playerName;
  playerName = replaceAll(playerName, "&", "&amp;");
  playerName = replaceAll(playerName, "<", "&lt;");
  playerName = replaceAll(playerName, ">", "&gt;");

  return `
    <svg width="450" height="180" viewBox="0 0 450 180" xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="bronze" x1="0%" x2="100%" y1="0%" y2="0%" gradientUnits="objectBoundingBox"
          gradientTransform="rotate(45)">
          <stop stop-color="#4F1E00" offset="0%" />
          <stop stop-color="#752F00" offset="50%" />
          <stop stop-color="#8D3A03" offset="100%" />
        </linearGradient>
        <linearGradient id="silver" x1="0%" x2="100%" y1="0%" y2="0%" gradientUnits="objectBoundingBox"
          gradientTransform="rotate(45)">
          <stop stop-color="#757F9A" offset="0%" />
          <stop stop-color="#D7DDE8" offset="100%" />
        </linearGradient>
        <linearGradient id="gold" x1="0%" x2="100%" y1="0%" y2="0%" gradientUnits="objectBoundingBox"
          gradientTransform="rotate(45)">
          <stop stop-color="#F37335" offset="0%" />
          <stop stop-color="#FDC830" offset="100%" />
        </linearGradient>
        <linearGradient id="platinum" x1="0%" x2="100%" y1="0%" y2="0%" gradientUnits="objectBoundingBox"
          gradientTransform="rotate(45)">
          <stop stop-color="#0CEBEB" offset="0%" />
          <stop stop-color="#20E3B2" offset="50%" />
          <stop stop-color="#29FFC6" offset="100%" />
        </linearGradient>
        <linearGradient id="diamond" x1="0%" x2="100%" y1="0%" y2="0%" gradientUnits="objectBoundingBox"
          gradientTransform="rotate(45)">
          <stop stop-color="#5B86E5" offset="0%" />
          <stop stop-color="#36D1DC" offset="100%" />
        </linearGradient>
        <linearGradient id="master" x1="0%" x2="100%" y1="0%" y2="0%" gradientUnits="objectBoundingBox"
          gradientTransform="rotate(45)">
          <stop stop-color="#9733EE" offset="0%" />
          <stop stop-color="#DA22FF" offset="100%" />
        </linearGradient>
        <linearGradient id="swordmaster" x1="0%" x2="100%" y1="0%" y2="0%" gradientUnits="objectBoundingBox"
          gradientTransform="rotate(45)">
          <stop stop-color="#12C2E9" offset="0%" />
          <stop stop-color="#C471ED" offset="50%" />
          <stop stop-color="#F64F59" offset="100%" />
        </linearGradient>
        <linearGradient id="zero" x1="0%" x2="100%" y1="0%" y2="0%" gradientUnits="objectBoundingBox"
          gradientTransform="rotate(45)">
          <stop stop-color="#000000" offset="0%" />
          <stop stop-color="#404040" offset="100%" />
        </linearGradient>
        <linearGradient id="banned" x1="0%" x2="100%" y1="0%" y2="0%" gradientUnits="objectBoundingBox"
          gradientTransform="rotate(45)">
          <stop stop-color="#200122" offset="0%" />
          <stop stop-color="#6F0000" offset="100%" />
        </linearGradient>
      </defs>
      <rect fill="white" x="0.5" y="0.5" width="450" height="180" rx="5" />
      <g transform="translate(250 30)" stroke-linecap="square">
        <image width="100" height="100" xlink:href="${blockBase64}" />
      </g>
      <g transform="translate(20 30)">
        <text font-family="Arial" font-size="18" font-weight="bold" fill="#3080ed">
          ${playerName}'s Scoresaber Stats
        </text>
      </g>
      <g transform="translate(350 150)">
        <text fill="url(#${blockImage})" font-family="Arial" font-weight="bold" font-size="20" text-anchor="middle">
          ${data.playerInfo.pp}pp
        </text>
      </g>
      <g transform="translate(20 80)">
        <text font-family="Arial" font-size="15" font-weight="bold">
          Global #${playerRank} (TOP ${rankPercent}%)
        </text>
      </g>
      <g transform="translate(20 100)">
        <text font-family="Arial" font-size="15" font-weight="bold">
          ${data.playerInfo.country} #${data.playerInfo.countryRank}
        </text>
      </g>
      <g transform="translate(20 150)">
        <text fill="url(#${blockImage})" font-family="Arial" font-size="30" font-weight="bold">
          ${capitalize(blockImage)}
        </text>
      </g>
    </svg>
    `;
};

module.exports = SSCards;

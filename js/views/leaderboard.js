export function renderLeaderboard() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <h2>Leaderboard</h2>
    <ul>
      <li>1. Lulu</li>
      <li>2. Pete</li>
      <li>3. Anna</li>
    </ul>
  `;
}
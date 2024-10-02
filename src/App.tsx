import "./App.css";

function App() {
  return (
    <>
      <header className="rps-header">
        <div className="rps-stats">
          <ul className="rps-stats__list">
            <li className="rps-stats__item rps-stats__item--balance">
              BALANCE: <span className="rps-stats__item--value">XXX.XX</span>
            </li>
            <li className="rps-stats__item rps-stats__item--bet">
              BET:
              <span className="rps-stats__item--value">XXX.XX</span>
            </li>
            <li className="rps-stats__item rps-stats__item--win">
              WIN:
              <span className="rps-stats__item--value">XXX.XX</span>
            </li>
          </ul>
        </div>
      </header>
      <main className="rps-main">
        <section className="rps-result">
          <h1 className="rps-result__title">PAPER WON</h1>
          <p className="rps-result__win-amount">YOU WIN XXX.XX</p>
        </section>
        <section className="rps-game">
          <p className="rps-game__instruction">PICK YOUR POSITIONS</p>
          <div className="rps-choices">
            <div className="rps-choice rps-choice--rock">
              <div className="rps-choice__value">500</div>
              <div className="rps-choice__name">ROCK</div>
            </div>
            <div className="rps-choice rps-choice--paper">
              <div className="rps-choice__value">500</div>
              <div className="rps-choice__name">PAPER</div>
            </div>
            <div className="rps-choice rps-choice--scissors">
              <div className="rps-choice__value">500</div>
              <div className="rps-choice__name">SCISSORS</div>
            </div>
          </div>
        </section>
        <button className="rps-play-button">PLAY</button>
      </main>
    </>
  );
}

export default App;

import { useState } from "react";
import "./App.css";

function Cell({ filled, onClick, isDisable }) {
  return (
    <button
      className={`cell ${filled ? "cell-activated" : ""}`}
      onClick={onClick}
      disabled={isDisable}
    />
  );
}

function App() {
  const [order, setOrder] = useState([]);
  const [isDeactive, setDeactivate] = useState(false);
  const config = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];
  const deactivateCells = () => {
    setDeactivate(true);
    const timer = setInterval(() => {
      setOrder((prevOrder) => {
        const newOrder = [...prevOrder];
        newOrder.pop();
        if (newOrder.length === 0) {
          clearInterval(timer);
          setTimeout(() => setDeactivate(false), 300);
        }
        return newOrder;
      });
    }, 300);
  };

  const activateCells = (i) => {
    const newOrder = [...order, i];
    setOrder(newOrder);
    if (newOrder.length === config.flat().filter(Boolean).length) {
      deactivateCells();
    }
  };

  return (
    <div className="wrapper">
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${config[0].length})` }}
      >
        {config.flat(1).map((val, i) => {
          return val ? (
            <Cell
              key={i}
              filled={order.includes(i)}
              onClick={() => activateCells(i)}
              isDisable={order.includes(i) || isDeactive}
            />
          ) : (
            <span key={i} />
          );
        })}
      </div>
    </div>
  );
}

export default App;

// const deactivateCells = () => {
//   setDeactivate(true);
//   const timer = setInterval(() => {
//     setOrder((origOrder) => {
//       const newOrder = origOrder.slice(1);
//       newOrder.pop();
//       if (newOrder.length === 0) {
//         clearInterval(timer);
//         setDeactivate(false);
//       }
//       return newOrder;
//     });
//   }, 300);
// };
// const activateCells = (i) => {
//   const newOrder = [...order, i];
//   setOrder(newOrder);
//   console.log(newOrder);
//   if (newOrder.length === config.flat().filter(Boolean).length) {
//     deactivateCells();
//   }
// };

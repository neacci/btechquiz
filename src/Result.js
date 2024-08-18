import React from "react";

function Result({ answers }) {
  return (
    <div className="results">
      <h2>Sonuçlar</h2>
      <table>
        <thead>
          <tr>
            <th>Soru</th>
            <th>Cevap</th>
          </tr>
        </thead>
        <tbody>
          {answers.map((answer, index) => (
            <tr key={index}>
              <td>Soru {index + 1}</td>
              <td>{answer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Result;

import { useState} from "react";
import {evaluate} from 'mathjs'
function App() {
  const [result, setResult] = useState("");
  const items = [7,8,9,"del",4,5,6,"+",1,2,3,"-",".",0,"/","*","reset","="];
  const handleClick = (e) => {
    e.target.textContent === 'reset' ? setResult('') : e.target.textContent === 'del' ? setResult(result.substr(0, result.length-1)) : setResult(result + e.target.textContent);
    if(e.target.textContent === '='){
      if(!isNaN(result)){
        setResult(result)
        return;
      }try {
        setResult(evaluate(result));
      } catch (error) {
        setResult('Syntax Error')
        setTimeout(() => {
          setResult('')
        }, 2000);
        return;
      }if(!isFinite(evaluate(result))){
        setResult('Syntax Error')
        setTimeout(() => {
          setResult('')
        }, 2000);
        return;
      }
    }
  };
  return (
    <main>
      <div className="container__controller">
        <p className="logo">calc</p>
      </div>
      <div className="container__resultado">
        <p>{result !== "" ? result : 0}</p>
      </div>
      <div className="container__buttons">
        {items.map((item) => (
          <button type="button" key={item} onClick={(e) => handleClick(e)} style={{
            backgroundColor: item === 'reset' || item === 'del' ? '#637097' : item === '=' ? '#d03f2f' : '',
            borderBottom: item === 'reset' || item === 'del' ? '5px solid #404e72' : item === '=' ? '5px solid #93261a' : '',
            color: item === 'reset' || item === 'del' || item === '=' ? '#fff' : '',
            fontSize: item === 'reset' || item === 'del' || item === '=' ? '1.4rem' : ''
          }}>
            {item}
          </button>
        ))}
      </div>
    </main>
  );
}

export default App;

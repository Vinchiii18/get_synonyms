import { useState } from 'react'
import './App.css'

function App() {
  const [word, setWord] = useState<string>("")
  const [data, setData] = useState<any[]>([])

  async function fetchSynonyms(word: string) {
    if (!word) {
      alert("Please enter a word")
      return
    }
    const response = await fetch(`https://api.datamuse.com/words?rel_syn=${word}`)
    const data = await response.json()
    setData(data)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    fetchSynonyms(word)
  }
  const handleClick = async (word: string) => {
    fetchSynonyms(word)
    setWord(word)
  }
  return (
    <div>
      <form onSubmit={handleSubmit} action="">
        <label htmlFor="">Enter a word: </label>
        <input onChange={(e) => setWord(e.target.value)} value={word} type="text" />
        <button>Submit</button>
        <div>
          <ul>
            {data.map((word) => (
              <li onClick={() => handleClick(word.word)} key={word.word}>
                {word.word}
              </li>
            ))}
          </ul>
        </div>
      </form>
      
      
    </div>
  )
}

export default App

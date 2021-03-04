import { useState, useEffect } from 'react'
import createCard from './services/createCard'
import createUser from './services/createUser'
import getCards from './services/getCards'
import getUsers from './services/getUsers'
import styled from 'styled-components/macro'

function App() {
  const [users, setUsers] = useState([])
  const [cards, setCards] = useState([])

  useEffect(() => {
    getUsers().then(data => setUsers([...data]))
  }, [])

  useEffect(() => {
    getCards().then(data => setCards([...data]))
  }, [])

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.target
    const { text, author } = form.elements
    createCard({ text: text.value, author: author.value }).then(() =>
      getCards().then(data => setCards([...data]))
    )
  }

  function handleCreateUser(event) {
    event.preventDefault()
    const form = event.target
    const { name } = form.elements
    createUser({ name: name.value }).then(() =>
      getUsers().then(data => setUsers([...data]))
    )
  }

  return (
    <div>
      <UsersContainer>
        <h2>Users:</h2>
        {users.map(user => (
          <div key={user._id}>
            {user.name} ({user._id})
          </div>
        ))}
        <h2>Erstelle einen User:</h2>
        <form onSubmit={handleCreateUser}>
          <label>
            Name:
            <br />
            <input name="name" />
          </label>

          <Button>Create User</Button>
        </form>
      </UsersContainer>
      <QuestionFormContainer>
        <h2>Erstelle eine Frage:</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Text:
            <br />
            <input name="text" />
          </label>
          <label>
            <br />
            Author ID:
            <br />
            <input name="author" />
          </label>
          <Button>Create card</Button>
        </form>
      </QuestionFormContainer>
      <CardsContainer>
        {cards.map(card => (
          <Cards key={card._id}>
            {card.text} ({card.author.name})
          </Cards>
        ))}
      </CardsContainer>
    </div>
  )
}

export default App

const UsersContainer = styled.section`
  background-color: white;
  color: black;
  margin: 20px;
  padding: 20px;
  border-radius: 10px;
`
const QuestionFormContainer = styled.section`
  background-color: white;
  color: black;
  margin: 20px;
  padding: 20px;
  border-radius: 10px;
`

const CardsContainer = styled.section`
  background-color: white;
  color: royalblue;
  margin: 20px;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  border-radius: 10px;
`

const Cards = styled.div`
  background-color: lightcoral;
  color: royalblue;
  margin: 20px;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 2px 3px #eee;
`
const Button = styled.button`
  background-color: pink;
  font-size: 16px;
  margin: 20px;
  padding: 10px;
  border-radius: 20px;
  border: none;
  box-shadow: 2px 3px #eee;
`

import { useState } from "react"
import { Image, Input, Button } from 'antd'
import moment from 'moment'
import { RepositoryItem } from "./RepositoryItem"
import '../styles/repositories.scss'


export function RepositoryList() {
  const [repositories, setRepositories] = useState()
  const [author, setAuthor] = useState()

  const [values, setValues] = useState({
    authorInput: ''
  })

  const onInputChange = (name, value) => {
    console.log(name, value)

    setValues((oldValue) => ({
      ...oldValue,
      [name]: value,
    }))
  }


  const searchRepository = () => {  
    const { authorInput } = values
    fetch(`https://api.github.com/users/${authorInput}/repos`)
    .then(response => response.json())
    .then(data => setRepositories(data))

    fetch(`https://api.github.com/users/${authorInput}`)
    .then(response => response.json())
    .then(data => setAuthor(data))
  }

  return (
    <div className="container">
      <header>Github Search</header>
      <div className="form">
        <Input
          className="input"
          name={'authorInput'}
          placeholder={'Github User'}
          onChange={(pickedValue) => onInputChange('authorInput', pickedValue.target.value)}
          value={values.authorInput}
        ></Input>
        <Button
          className="button"
          onClick={searchRepository}
          disabled={!values.authorInput}
        >SEARCH</Button>
      </div>
      {console.log({author})}
      { repositories
        && <section className="card">
            <div className="user">
              <Image
                width={'100%'}
                src={author?.avatar_url}
                preview={false}
              />

              <div className="info">
                <h2>{author?.name}</h2>
                <p className="title">{author?.location}</p>
                <p>{author?.bio}</p>
              </div>
              </div>

              <div className="repositories">
              <ul>
                {
                  repositories.map(repository => {
                      return <RepositoryItem key={repository.name} repository={repository} />
                  })
                } 
              </ul>
              </div>
              
          </section>
      }

      
    </div>
  )
}


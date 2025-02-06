import { For } from 'solid-js'
import Card from '../components/Card'

const articles = [
  {
    tile: 'yo',
    summary: 'hello'
  },
  {
    tile: 'yo',
    summary: 'hello'
  },
  {
    tile: 'yo',
    summary: 'hello'
  },
  {
    tile: 'yo',
    summary: 'hello'
  },
  {
    tile: 'yo',
    summary: 'hello'
  }
]

const Blog = () => {
  return (
    <main>
      <h1>Blog</h1>
      <For each={articles}>
        {(article) => <Card title={article.tile}>{article.summary}</Card>}
      </For>
    </main>
  )
}

export default Blog

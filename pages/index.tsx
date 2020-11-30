import Link from 'next/link'
import Layout from '../components/Layout'

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>

    <div>
      <Link href="/login">
        <a>login</a>
      </Link>
    </div>

    <div>
      <Link href="/csrpeople">
        <a>CSRpeople</a>
      </Link>
    </div>
    <div>
      <Link href="/ssrpeople">
        <a>SSRpeople</a>
      </Link>
    </div>
  </Layout>
)

export default IndexPage

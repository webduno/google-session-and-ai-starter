import Image from 'next/image'
import styles from '../page.module.css'
import { useState } from 'react';

export default function HomeContent({searchQuery, setSearchQuery, handleLogin, handleLogout, session}: {searchQuery: string, setSearchQuery: (searchQuery: string) => void, handleLogin: () => void, handleLogout: () => void, session: any}) {
    const [result, setResult] = useState<string>("");
    async function handleSubmitSearch(): Promise<void> {
        console.log("submit search", searchQuery);
        // setSearchQuery("");
        alert("submit search: " + searchQuery);

        const data = await callTheAI(searchQuery);
        console.log("ai data", data);
        setResult(data.choices[0].message.content);
    }
    const callTheAI = async (prompt: string) => {
      const response = await fetch("/api/ai", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      })
      const data = await response.json();
      console.log(data);
      return data;
    }

    const handleGoogleLogin = () => {
        handleLogin();
    }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
        <div>
          
          <button onClick={handleGoogleLogin}>Login with Google</button>
        </div>
      </div>

      <div className={styles.center + " flex-col z-100 pos-rel"}>
        {/* <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        /> */}
        <div>Find legal templates quickly and easily.</div>
        <div className='flex-col'>
            <input className='z-200' type="text" placeholder="Enter your question" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <button className='z-200' onClick={handleSubmitSearch}>Submit</button>
        </div>
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore the Next.js 13 playground.</p>
        </a>

        <div
          className={styles.card}
        >
          {result}
        </div>
        {/* <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a> */}
      </div>
    </main>
  )
} 
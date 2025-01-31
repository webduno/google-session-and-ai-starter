import Image from 'next/image'
import styles from '../page.module.css'
import { useState } from 'react';
import GoogleLoginButton from '../dom/GoogleLoginButton';
const EXAMPLE_RESULT = "There are possibly two types of legal document templates you may be interested in: 1. Student Loan Agreement Template: If you're looking to draft an agreement between a lender and a student, a student loan agreement template would be appropriate. This document outlines the terms and conditions of the loan, including the interest rate, payment terms, default provisions and any other relevant information. 2. Student Loan Repayment Agreement Template: If the student borrower is arranging a repayment plan with the lender, then a student loan repayment agreement would be a suitable template. This outlines how the borrower intends to pay back the loan, including the period of time, the amount of each payment, and what happens if a payment is missed";  
export default function HomeContent({searchQuery, setSearchQuery, handleLogin, handleLogout, session}: {searchQuery: string, setSearchQuery: (searchQuery: string) => void, handleLogin: () => void, handleLogout: () => void, session: any}) {
    const [result, setResult] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    async function handleSubmitSearch(): Promise<void> {
      if (searchQuery === ""  ) {
        alert("Please enter a search query");
        return;
      }
        setLoading(true);
        try {
            console.log("submit search", searchQuery);

            if (!session) {
                alert("Please login to search");
                // Add 1 second delay
                await new Promise(resolve => setTimeout(resolve, 3000));
                setResult(EXAMPLE_RESULT);
                return;
            }

            const data = await callTheAI(searchQuery);
            console.log("ai data", data);
            setResult(data.choices[0].message.content);
        } finally {
            setLoading(false);
        }
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
    const handleReset = () => {
        setResult("");
        setSearchQuery("");
        // set focus to the input
        const input = document.querySelector('input');
        if (input) {
          input.focus();
        }
    }
    const handleGoogleLogin = () => {
        handleLogin();
    }

  return (
    <main className={" flex-col tx-white z-1 pos-rel w-100 h-100vh flex-justify-start"}  
    style={{background: "linear-gradient(180deg, #00000077, #36373A, #00000000)"}}
    >
      <div className={"flex-align-self-end"} >
        {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
        <GoogleLoginButton handleLogin={handleLogin} session={session} handleLogout={handleLogout} />
      </div>

      <div className={"" + " flex-col z-100 pos-rel mt-8"}>
        {/* <Image
          className={""}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        /> */}
        <div className='tx-bold-2 flex-col'>
          <div>Find any</div>
          <div>legal templates </div>
          <div>quickly and easily.</div>
        </div>
        <div className='flex-wrap gap-2 mt-2 px-4'>
            <input
            className='z-200 bg-w-10 px-4 noborder py-2 bord-r-25 tx-lg tx-white'
            type="text" 
            placeholder="Enter your question" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmitSearch();
              }
            }}
            />
            <div className='flex-wrap gap-2'>
              
             {/* only show if there is a result */}
             {result && (
            <button
            style={{
            }}
             className='z-200 bg-b-50 noborder px-3 tx-lg tx-white tx-ls-1 bord-r-25 py-1 opaci-chov--50 tx-'
             onClick={handleReset}>Reset</button>
            )}
            <button
            style={{
              background: loading ? "#777777" : "linear-gradient(45deg, #2DD8EA, #04DD43)",
            }}
             className='z-200 bg-b-50 noborder px-3  tx-white tx-ls-1 bord-r-25  opaci-chov--50 tx-'
             onClick={loading ? () => {} : handleSubmitSearch}>
                {loading ? <span className="">Generating response...</span> : <div className='tx-xl pb-2'>➡</div>}
            </button>
            </div>
        </div>
      </div>
        
      {loading && (
        <div className='flex-col mt-8 px-4'>
          <div className='mb-4'>Loading results... </div>
            <div className='flex-col tx-xl tx-bold spin-6'>
                <div><span className="">|</span></div>
            </div>
        </div>
      )}

      {!loading && result && (
        <div className='flex-col mt-8 px-4'>
            <div className='flex-col flex-align-start bg-b-90 bord-r-25 px-4 py-3'>
                {/* show Example Result as prefix if hardcoded result if its the same as the result */}
                {result === EXAMPLE_RESULT && (
                    <div>Example Result</div>
                )}
                <div>
                    {result}
                </div>
            </div>
        </div>
      )}

<div className='w-100 mt-100 Q_md_x'></div>
<div className='w-100 mt-200 '><hr className='w-50 opaci-20' /></div>
      <div className={" flex-wrap flex-justify-start"}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={"px-2 tx-white nodeco opaci-chov--50"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p className="w-200px">Find in-depth information<div className='Q_md_x'> about Next.js features and API</div>.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={"px-2 tx-white nodeco opaci-chov--50 Q _md_x"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p className="w-200px">Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={"px-2 tx-white nodeco opaci-chov--50 Q _md_x"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p className="w-200px">Explore the Next.js 13 playground.</p>
        </a>

        <div
          className={""}
        >
          {result}
        </div>
        {/* <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={"px-2 tx-white nodeco opaci-chov--50"}
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
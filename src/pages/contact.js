import React, { useState } from "react"

import PageLayout from "../components/layouts/page-layout"
import StyledTitle from "../components/title"
import SEO from "../components/seo"
import { SubmitButton, Input } from "../components/form/input"

const Contact = () => {
  const [isFetching, setIsFetching] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const encode = data => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&")
  }

  const handleSubmit = e => {
    e.preventDefault()
    setIsFetching(true)

    const data = {
      "form-name": "contact",
      name,
      email,
      message,
    }

    fetch(`/`, {
      method: `POST`,
      headers: { "Content-Type": `application/x-www-form-urlencoded` },
      body: encode(data),
    })
      .then(() => {
        setIsFetching(false)
        alert("Form submitted successfully")
      })
      .catch(() => {
        setIsFetching(false)
        alert("Failed to submit")
      })
      .finally(() => {
        console.clear()
        setName('')
        setEmail('')
        setMessage('')
      })
  }
  console.log('rendered')
  return (
    <>
      <PageLayout activeNav={5}>
        <SEO title="Contact" />
        <div style={{ margin: `3rem 0` }}>
          <StyledTitle>Contact Us</StyledTitle>

          <form
            onSubmit={handleSubmit}
            name="contact-form"
            method="post"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            action="/"
          >
            <input type="hidden" name="form-name" value="contact-form" />

            <div className="d-flex flex-column">
              <div className="d-flex flex-wrap">
                <div className="my-3" style={{ flex: `1 1 30ch` }}>
                  <label htmlFor="contact-name">Name</label>
                  <Input
                    id="contact-name"
                    type="text"
                    placeholder="John Doe"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="mx-3" />

                <div className="my-3" style={{ flex: `1 1 30ch` }}>
                  <label htmlFor="contact-email">Email</label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="johndoe@mail.com"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="my-4" style={{ flex: `1 1 60ch` }}>
                  <label htmlFor="contact-message">Message</label>
                  <Input
                    as="textarea"
                    rows="6"
                    id="contact-message"
                    placeholder="Hello there! Keep up the good work. I was going to say..."
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="">
                <SubmitButton
                  className="mt-2 mt-md-0"
                  type="submit"
                  name="submit"
                  value="Send message"
                />
                {isFetching && (
                  <span className="spinner-border spinner-border-sm ml-1" />
                )}
              </div>

            </div>
          </form>
        </div>
      </PageLayout>
    </>
  )
}

export default Contact

import React, { useState } from "react"
import Input, { SubmitButton } from "./input"
import styled from "styled-components"
import { BREAKPOINTS } from "../theme"

const FormContainer = styled.div`
  padding: 1rem;
  background-color: rgba(81, 45, 60, 0.2);
  background-color: ${({ theme: { main } }) => main.bgAlt};
  color: ${({ theme: { main } }) => main.fg};
  position: relative;
`

const FormDetail = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
`

const FormSubContainer = styled.div`
  @media (min-width: ${BREAKPOINTS.md}px) {
    max-width: 860px;
    margin: auto;
  }
`

const FormTitle = styled.span`
  display: block;
  font-weight: 500;
  color: ${({ theme }) => theme.main.day ? theme.primary : `mistyrose`};
  margin-bottom: 1rem;
  font-size: 1.35rem;
  font-family: "Satisfy", san-serif;
`

const handleSubmitHelper = (data, writeSuccess, writeError) => {
  console.log(encodeURIComponent(data))
  fetch(`/`, {
    method: `POST`,
    headers: { "Content-Type": `aplication/x-www-form-urlencoded` },
    body: encodeURIComponent(data),
  })
    .then(() => {
      writeSuccess("Subscribed successfully")
    })
    .catch(error => {
      writeError("Failed to subscribe. Please check your connection")
      console.log(error)
    })
}

const NWSForm = props => {
  const [email, setEmail] = useState("")
  const [success, writeSuccess] = useState("")
  const [error, writeError] = useState("")
  const handleSubmit = e => {
    const onsuccess = msg => {
      writeSuccess(msg)
      setEmail("")
    }
    handleSubmitHelper(email, onsuccess, writeError)
    e.preventDefault()
  }
  return (
    <FormContainer {...props}>
      <FormSubContainer>
        <FormDetail>
          Let's give you a heads up anytime we put something on the wall.
        </FormDetail>
        <FormTitle>Sign up for our newsletter!</FormTitle>

        <form
          name="newsletter"
          method="post"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="newsletter" />
          <label htmlFor="nwsIfield" className="sr-only">
            Email Address
          </label>
          <Input
            id="nwsIfield"
            placeholder="you@subscribe.com"
            name="email"
            type="email"
            value={email}
            onChange={evt => setEmail(evt.target.value)}
          />
          <SubmitButton
            className="ml-md-5 mt-2 mt-md-0"
            name="submit"
            value="Subscribe"
            type="submit"
            disabled={!email ? true : false}
          />
        </form>
      </FormSubContainer>
    </FormContainer>
  )
}

export default NWSForm

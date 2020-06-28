import React, { useState } from "react"
import styled from "styled-components"
import addToMailChimp from "gatsby-plugin-mailchimp"
import { StyledInput as Input, SubmitButton } from "../form/input"
import { BREAKPOINTS } from "../theme"

const FormContainer = styled.div`
  padding: 1rem;
  background-color: rgba(81, 45, 60, 0.2);
  background-color: ${({ theme: { main } }) => main.bgAlt};
  color: ${({ theme: { main } }) => main.fg};
  position: relative;
`

export const FormDetail = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  font-family: "Roboto";
`

const FormSubContainer = styled.div`
  @media (min-width: ${BREAKPOINTS.md}px) {
    margin: auto;
  }
`

const FormTitle = styled.span`
  display: block;
  font-weight: 500;
  color: ${({ theme }) => (theme.main.day ? theme.primary : theme.secondary)};
  margin-bottom: 1rem;
  font-size: 1.35rem;
  font-family: "Satisfy", san-serif;
`

const encode = data => {
  return Object.keys(data)
    .map(key => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
    })
    .join("&")
}

const handleSubmitHelper = data => {
  return fetch(`/.netlify/functions/subscribe`, {
    method: `POST`,
    headers: { "Content-Type": `application/x-www-form-urlencoded` },
    body: encode(data),
  }).then(res => {
    return res.json()
  })
}

const NWSForm = props => {
  const [email, setEmail] = useState("")
  const [success, writeSuccess] = useState("")
  const [error, writeError] = useState("")
  const id = new Date().getTime().toString(36)

  const handleSubmit = e => {
    addToMailChimp(email, { PATHNAME: window.location.pathname }).then(
      ({ result, msg }) => {
        if (result === "success") {
          handleSubmitHelper({ "form-name": "newsletter", email, id })
            .then(data => writeSuccess(data.message))
            .catch(error => {
              console.log(`Could not submit to netlify: ${error}`)
            })
          setEmail("")
          writeSuccess(msg)
          return
        }
        writeError(`${result}: ${msg}`)
        setTimeout(() => {
          setEmail("")
          writeError("")
        }, 3000) // reset and trigger re-render after 3000ms
      }
    )

    e.preventDefault()
  }

  return (
    <FormContainer {...props}>
      <FormSubContainer>
        {success ? (
          <FormDetail>{success}</FormDetail>
        ) : error ? (
          <FormDetail>{error}</FormDetail>
        ) : (
          <>
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
              action="https://eaveswall.us10.list-manage.com/subscribe/post?u=cda54cb5c3547ef2d9b060531&amp;id=9b4867bb1d"
            >
              <input type="hidden" name="form-name" value="newsletter" />
              <label htmlFor="nwsIfield" className="sr-only">
                Email Address
              </label>
              <Input
                id="nwsIfield"
                className="my-2"
                placeholder="you@subscribe.com"
                name="email"
                type="email"
                value={email}
                onChange={evt => setEmail(evt.target.value)}
              />
              <input type="hidden" name="id" value={id} />
              <SubmitButton
                className="ml-md-5 mt-2 mt-md-0"
                name="submit"
                value="Subscribe"
                type="submit"
                disabled={!email ? true : false}
              />
            </form>
          </>
        )}
      </FormSubContainer>
    </FormContainer>
  )
}

export default NWSForm

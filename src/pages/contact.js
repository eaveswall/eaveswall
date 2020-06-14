import React, { useState } from "react"

import PageLayout from "../components/layouts/page-layout"
import StyledTitle from "../components/title"
import SEO from "../components/seo"
import { SubmitButton } from "../components/form/input"

const Contact = () => {
  const [isFetching, setIsFetching] = useState(false)

  const encode = data => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&")
  }

  const handleContactSubmit = e => {
    e.preventDefault()
    setIsFetching(true)

    const form = e.target
    const { name, email, message } = form

    const data = {
      "form-name": "contact",
      name: name.value,
      email: email.value,
      message: message.value,
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
      .catch(err => {
        setIsFetching(false)
        alert("Failed to submit")
      })
      .finally(() => {
        form.reset()
      })
  }

  return (
    <>
      <PageLayout activeNav={5}>
        <SEO title="Contact" />
        <div style={{ margin: `3rem 0`, fontFamily: ``, fontSize: `1rem` }}>
          <StyledTitle>Contact Us</StyledTitle>

          <form
            onSubmit={handleContactSubmit}
            name="Contact Form"
            className="mt-2"
            style={{ fontFamily: "Roboto" }}
          >
            <input type="hidden" name="form-name" value="Contact Form" />

            <div className="row mb-3">
              <div className="col-lg-6 mb-4">
                <label htmlFor="contact-name">Name</label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  placeholder="John Doe"
                  required
                  name="name"
                  id="contact-name"
                  style={{ borderRadius: "7px" }}
                />
              </div>

              <div className="col-lg-6 mb-4">
                <label htmlFor="contact-email">Email</label>
                <br />
                <input
                  type="email"
                  className="form-control"
                  placeholder="johndoe@mail.com"
                  required
                  name="email"
                  id="contact-email"
                  style={{ borderRadius: "7px" }}
                />
              </div>

              <div className="col-lg-12 mb-4">
                <label htmlFor="contact-message">Message</label>
                <br />
                <textarea
                  rows="6"
                  className="form-control"
                  placeholder="Message here"
                  required
                  name="message"
                  id="contact-message"
                  style={{ borderRadius: "7px" }}
                />
              </div>

              <div className="col">
                <SubmitButton
                  className="mt-2 mt-md-0"
                  name="submit"
                  value="Submit"
                  type="submit"
                  // disabled={!isFetching ? true : false}
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

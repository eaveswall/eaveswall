import React, { useState } from "react"

import PageLayout from "../components/layouts/page-layout"
import StyledTitle from "../components/title"
import SEO from "../components/seo"
import Input, { SubmitButton } from "../components/newsletter-sub/input"

const Contact = () => {
  const [isFetching, setIsFetching] = useState(false)

  const handleContactSubmit = e => {
    e.preventDefault()
    e.target.reset()
    setIsFetching(true)

    const form = e.target
    const { name, email, message } = form
    console.log(name.value, email.value, message.value)

    const formData = new FormData()
    formData.append("Name", name.value)
    formData.append("Email", email.value)
    formData.append("Message", message.value)

    fetch("/", {
      method: "POST",
      body: formData,
    })
      .then(resp => {
        console.log(resp)
        if (!resp.ok) throw Error
        setIsFetching(false)
      })
      .catch(err => {
        setIsFetching(false)
      })
  }

  return (
    <>
      <PageLayout activeNav={5}>
        <SEO title="Contact" />
        <div style={{ margin: `3rem 0`, fontFamily: ``, fontSize: `1rem` }}>
          <StyledTitle>Contact Us</StyledTitle>

          <form onSubmit={handleContactSubmit} name="Contact Form">
            <div className="row mb-3">
              <div className="col-lg-6 mb-4">
                <label>Name</label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  placeholder="John Doe"
                  required
                  name="name"
                  style={{ borderRadius: "0" }}
                />
              </div>

              <div className="col-lg-6 mb-4">
                <label>Email</label>
                <br />
                <input
                  type="email"
                  className="form-control"
                  placeholder="example@gmail.com"
                  required
                  name="email"
                  style={{ borderRadius: "0" }}
                />
              </div>

              <div className="col-lg-12 mb-4">
                <label>Message</label>
                <br />
                <textarea
                  rows="6"
                  className="form-control"
                  placeholder="Message here"
                  required
                  name="message"
                  style={{ borderRadius: "0" }}
                />
              </div>

              <div className="col">
                <SubmitButton
                  className="mt-2 mt-md-0"
                  name="submit"
                  value="Subscribe"
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

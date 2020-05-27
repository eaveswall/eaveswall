import React from "react"

import PageLayout from "../components/layouts/page-layout"
import StyledTitle from "../components/title"
import { Link } from "gatsby"
import SEO from "../components/seo"

const About = () => (
  <>
    <PageLayout activeNav={4}>
      <SEO title="About" />
      <div
        style={{ margin: `3rem 0`, fontFamily: ``, fontSize: `1rem` }}
      >
        <StyledTitle>About</StyledTitle>
        <p>
          Eaveswall is a campus blog and not your "normal gossip sites". We just
          want to bring the fun to all, without restrictions, 'cause
          there is no fun in restrictions. We are not a{" "}
          <em>"See what Davido ate last night"</em>&nbsp;&nbsp;kinda blog or a{" "}
          <em>"You won't believe..."</em>&nbsp;&nbsp;kinda...those are just
          click baits you often times fall for while you end up not being
          amused. We are more like <Link>go find out for yourself</Link>.
          Eaveswall is a place to make fun, share opinions, in fact do whatever you want freely.
          {/* eslint-disable-next-line */}
          <span role="presentation">😘</span>
        </p>
        <p>
          The Eaveswall ecosystem includes realtime interactions on twitter, whatsapp and  instagram. Promotions, giveaways and contests are part of what makes the ecosystem we create a great one, too.
        </p>
      </div>
    </PageLayout>
  </>
)

export default About

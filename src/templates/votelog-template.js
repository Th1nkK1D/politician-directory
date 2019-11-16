import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { css, Global } from "@emotion/core"

import ExternalLink from "../components/externalLink"
import Layout from "../components/layout"
import SEO from "../components/seo"
import VoterList from "../components/voterList"

export const query = graphql`
  query($slug: String!) {
    votelogYaml(fields: { slug: { eq: $slug } }) {
      id
      title
      legal_title
      vote_date(formatString: "DD.M.YYYY")
      description_th
      reference
      document {
        title
        link
      }
      meeting
      passed
      total_voter
    }

    voteRecordIcon: file(
      relativePath: { eq: "images/votelog/VoteRecord.png" }
    ) {
      childImageSharp {
        fixed(height: 30) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
const VotelogPage = ({ data: { votelogYaml, voteRecordIcon } }) => {
  return (
    <Layout
      pageStyles={{
        background: "#000",
        paddingTop: "5rem",
      }}
      mainStyles={{
        background: "#fff",
        width: "920px",
        borderRadius: "10px",
        padding: "3rem",
      }}
    >
      <Global
        styles={css`
          section:not(:last-child) {
            border-bottom: 0.5rem solid black;
            padding-top: 3rem;
            padding-bottom: 3rem;
            h2 {
              font-size: 4.8rem;
              text-align: center;
            }
            .dot {
              margin: 0 1rem;
              height: 2rem;
              width: 2rem;
              display: inline-block;
              border-radius: 50%;
              background-color: ${votelogYaml.passed
                ? "var(--cl-vote-yes)"
                : "var(--cl-vote-no)"};
            }
          }
        `}
      />
      <SEO title="มติ" />
      <section
        css={css`
          padding-bottom: 1rem !important;
          span {
            font-size: 3rem;
          }
        `}
      >
        <div className="container">
          <span>
            <Img
              fixed={voteRecordIcon.childImageSharp.fixed}
              css={css`
                -webkit-filter: invert(100%);
                vertical-align: middle;
              `}
            />
            {votelogYaml.meeting}
            <span
              css={css`
                float: right;
              `}
            >
              {votelogYaml.vote_date}
            </span>
          </span>
        </div>
      </section>
      <section
        css={css`
          padding-bottom: 1rem !important;
          span {
            font-size: 3rem;
          }
        `}
      >
        <div
          className="container"
          css={css`
            margin-bottom: 3rem;
          `}
        >
          {" "}
          <h1
            css={{
              marginTop: 0,
            }}
          >{`${votelogYaml.title}`}</h1>
          <p
            css={css`
              font-size: 2rem;
            `}
          >
            {votelogYaml.legal_title}
          </p>
        </div>
        <span>
          สถานะ{" "}
          {votelogYaml.passed ? (
            <span
              css={css`
                color: var(--cl-vote-yes);
              `}
            >
              <span className="dot"></span>ผ่าน
            </span>
          ) : (
            <span
              css={css`
                color: var(--cl-vote-no);
              `}
            >
              <span className="dot"></span>ไม่ผ่าน
            </span>
          )}
          <span
            css={css`
              float: right;
            `}
          >
            ผู้ลงคะแนน {votelogYaml.total_voter} คน
          </span>
        </span>
      </section>
      <section
        css={css`
          font-size: 2rem;
        `}
      >
        <h1>เนื้อหา</h1>
        <p>{votelogYaml.description_th}</p>
        <p
          css={css`
            font-weight: bold;
            padding-top: 2em;
          `}
        >
          อ้างอิง
        </p>
        <ExternalLink
          href={votelogYaml.reference}
          css={css`
            :hover {
              color: var(--cl-black);
            }
          `}
        >
          <p>{votelogYaml.reference}</p>
        </ExternalLink>
        <p
          css={css`
            font-weight: bold;
            padding-top: 2em;
          `}
        >
          เอกสารการลงมติ
        </p>
        <button
          css={css`
            display: flex;
            flex-flow: row wrap;
            padding: 0;
            border: none;
            background: none;
            width: 100%;
            border-radius: 5px;
            pointer-events: none;
            &:focus {
              outline: none;
            }
            text-align: left;
          `}
        >
          {votelogYaml.document.map(doc => (
            <ExternalLink
              href={doc.link}
              css={css`
                color: var(--cl-black);
                :hover {
                  color: var(--cl-black);
                }
              `}
            >
              <span
                css={css`
                  font-family: var(--ff-title);
                  font-size: 2.4rem;
                  line-height: 3rem;
                  cursor: pointer;
                  border-radius: 5px;
                  padding: 1rem 1rem;
                  margin-right: 1rem;
                  display: block;
                  background-color: #fcbbdd;
                  pointer-events: auto;
                `}
              >
                {doc.title}
              </span>
            </ExternalLink>
          ))}
        </button>
      </section>
      <VoterList votelogKey={votelogYaml.id} />
    </Layout>
  )
}

export default VotelogPage

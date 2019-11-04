import React from "react"

const rowStyle = {
  display: "flex",
  flexDirection: "row",
  flex: 1,
}

const columnStyle = {
  display: "flex",
  flexDirection: "column",
}

const partyProfileBarStyle = {
  ...columnStyle,
  margin: "20px 0",
}

const labelStyle = {
  ...rowStyle,
  fontFamily: "var(--ff-title)",
  marginBottom: 3,
}

const chartStyle = {
  ...rowStyle,
  border: "1px solid var(--cl-black)",
  width: "100%",
}

const chartCellStyle = {
  ...columnStyle,
  fontSize: "75%",
  padding: "10px 2px",
  borderRight: "inherit",
  "&:last-child": {
    borderRightWidth: 0,
  },
}

const PartyProfileBar = ({ dataset }) => {
  return (
    <div css={partyProfileBarStyle}>
      <div css={labelStyle}>
        {dataset.map(({ label, value }) => (
          <div key={label} css={{ ...columnStyle, width: `${value}%` }}>
            {label}
          </div>
        ))}
      </div>
      <div css={chartStyle}>
        {dataset.map(({ label, value, color }) => (
          <div
            key={label}
            css={{
              ...chartCellStyle,
              width: `${value}%`,
              color: `var(--cl-${color === "black" ? "white" : "black"})`,
              backgroundColor: `var(--cl-${color})`,
            }}
          >
            {value}%
          </div>
        ))}
      </div>
    </div>
  )
}

export default PartyProfileBar

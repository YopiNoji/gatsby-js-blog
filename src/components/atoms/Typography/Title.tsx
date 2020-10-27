import React, { HtmlHTMLAttributes } from "react"

export const H1: React.FC<HtmlHTMLAttributes<HTMLHeadElement>> = ({...props}) => {
  return <h1 className="text-3xl" {...props}>{props.children}</h1>
}

export const H2: React.FC<HtmlHTMLAttributes<HTMLHeadElement>> = ({...props}) => {
  return <h2 className="" {...props}>{props.children}</h2>
}

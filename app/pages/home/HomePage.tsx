import type { FC } from "react"
import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => [{ title: "Home" }];

export const HomePage: FC = () => {
  return (
    <div>HomePage</div>
  )
}

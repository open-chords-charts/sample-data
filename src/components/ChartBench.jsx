import {HotKeys} from "react-hotkeys"

import Chart from "../containers/Chart"
import EditToolbar from "../containers/EditToolbar"


const ChartBench = ({
  moveLeft,
  moveRight,
  slug,
  title,
  width,
}) => (
  <article style={{marginBottom: 60}}>
    <h1 id={slug}>
      <a href={"#" + slug} style={{textDecoration: "none"}} title="Anchor"></a>
      {" "}
      {title}
      <small>
        {" "}
      </small>
    </h1>
    <EditToolbar chartSlug={slug} />
    <HotKeys
      handlers={{
        moveLeft,
        moveRight,
      }}
    >
      <Chart slug={slug} width={width} />
    </HotKeys>
  </article>
)


export default ChartBench

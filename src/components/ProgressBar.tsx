import "../css/progress-bar.css"

export function ProgressBar ({percent}: any) {
  return (
    <div className="progress">
      <div className="progress-bar" role="progressbar" style={{height: `${percent}%`}}/>
    </div>
  )
}

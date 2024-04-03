import { Button, FlexBoxCol, FlexBoxRow } from "./styled/styled";

export function Overlay ({children, title, accept, reject}: any)  {
  return (
    <div style={{zIndex: 999, position: "fixed", background: "rgba(0,0,0,0.8)", left: 0, top: 0, right: 0, bottom: 0}}>
      <FlexBoxCol style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", maxHeight: "500px", width: "80%", background: "#FFF", borderRadius: '25px'}}>
        <div style={{padding: "16px"}}>
          <span style={{fontSize: "20px", fontWeight: "bold",color: "#000000", textAlign: "center", display: "block"}}>{title}</span>
        </div>
        <div style={{flex: 1}}>
          {children}
        </div>
        <FlexBoxRow style={{padding: "16px"}}>
          {accept && <Button onClick={accept.action}>{accept.text}</Button>}
          {reject && <Button onClick={reject.action}>{reject.text}</Button>}
        </FlexBoxRow>
      </FlexBoxCol>
    </div>
  )
}

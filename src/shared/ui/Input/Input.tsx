
export default function Input({type,label,classname,onChange,min,max,value}:{type:string,label?:string,classname:string,onChange?:()=>void,min?:number,max?:number,value?:number}) {
  return (
    <input type={type} className={classname} placeholder={label} onChange={onChange} min={min} max={max} value={value}/>
  )
}

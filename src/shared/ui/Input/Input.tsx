
export default function Input({type,label,className,onChange,min,max,value}:{type:string,label?:string,className:string,onChange?:(e: React.ChangeEvent<HTMLInputElement>) => void,min?:number,max?:number,value?:number|string

}) {
  return (
    <input  type={type} className={className} placeholder={label} onChange={onChange} min={min} max={max} value={value}/>
  )
}

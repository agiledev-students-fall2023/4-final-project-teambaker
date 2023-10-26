const FormInput = (props) => {
  // attributes: id, placeholder
  // optional: type
  return (
    <div className="w-full py-1">
      <input className="w-full py-2 text-center
        border-solid border-2 border-navyBlue rounded-lg
        placeholder:text-center placeholder:text-gray-400"
      type={props?.type ?? "text"} id={props?.id} placeholder={props?.placeholder}/>
    </div>
  )
}

const FormInputs = (props) => {
  // attrobute: array of fields
  return (
    props?.fields?.map(field => 
      <FormInput type={field == "password" ? "password" : ""}
        id={field} placeholder={field} key={field}/>)
  )
}

export default FormInput
export {FormInputs}
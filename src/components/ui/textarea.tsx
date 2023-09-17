import React,{InputHTMLAttributes} from 'react'
import cn from 'classnames'

interface Iprops extends InputHTMLAttributes<HTMLInputElement>{
 name:string;
 placeholder?:string;
 className ?:string;
  
}

const Textarea = React.forwardRef<HTMLInputElement, Iprops>(
  (
    {
      className,      
      name,
      placeholder,
      ...rest
    },
    ref
  ) => {

    return (
      <div className='w-full h-full'>
    
        <textarea
          id={name}
          name={name}
          ref={ref}
          placeholder={placeholder}
          className={cn(`w-full h-full rounded-lg py-1 px-2 border border-solid border-mid-footer text-md font-semibold resize-none ${className}`)}
          autoComplete="off"
           spellCheck="false"
      
          {...rest}
        />
        
      </div>
    );
  }
);

export default Textarea;

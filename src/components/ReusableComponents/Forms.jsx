

function InputField({ label, type = 'text', value, onChange, maxLength, rows }) {
  return (
   
   <div className="form-group">
      <label>{label}</label>
      {type === 'textarea' ? (
        <textarea value={value} onChange={onChange} rows={rows} maxLength={maxLength} />
      ) : (
        <input type={type} value={value} onChange={onChange} accept={type === 'file' ? 'image/*' : undefined} />
      )}
    </div>
  );
}

export default InputField;
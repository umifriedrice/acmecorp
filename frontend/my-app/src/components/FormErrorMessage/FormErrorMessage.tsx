import "./FormErrorMessage.css";

const FormErrorMessage = ({ errors }: Props) => {
  return (
    <div className="form-errors">
      <p className="form-errors-title">
        Form is invalid, please check these suggestions below
      </p>
      <ul className="form-errors-list">
        {errors.map((err: string) => (
          <li key={err}>{err}</li>
        ))}
      </ul>
    </div>
  );
};

interface Props {
  errors: string[];
}

export default FormErrorMessage;
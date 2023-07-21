import style from './ButtonCategory.module.css';

interface ButtonCategoryProps {
    onClick: () => void;
    isActive: boolean;
    label: string;
}       

const ButtonCategory = ({ onClick, isActive, label }: ButtonCategoryProps) => {
  return (
    <button
      className={`${style.buttonCategory} 
      ${isActive ? style.active : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default ButtonCategory;
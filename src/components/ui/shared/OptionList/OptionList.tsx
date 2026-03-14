import './OptionList.scss';

export interface IOption<T extends string> {
  value: T;
  label: string;
  description?: string;
}

interface IBaseProps<T extends string> {
  options: IOption<T>[];
  label?: string;
}

interface ISingleProps<T extends string> extends IBaseProps<T> {
  value: T;
  onChange: (value: T) => void;
  multiple?: false;
}

interface IMultiProps<T extends string> extends IBaseProps<T> {
  value: T[];
  onChange: (value: T[]) => void;
  multiple: true;
}

type IOptionListProps<T extends string> = ISingleProps<T> | IMultiProps<T>;

export default function OptionList<T extends string>({
  options,
  value,
  onChange,
  multiple = false,
  label,
}: IOptionListProps<T>) {
  const isSelected = (v: T) =>
    Array.isArray(value)
      ? value.includes(v)
      : value === v;

  const handleClick = (v: T) => {
    if (Array.isArray(value)) {
      const next = value.includes(v)
        ? value.filter((x) => x !== v)
        : [...value, v];
      (onChange as IMultiProps<T>['onChange'])(next);
    } else {
      (onChange as ISingleProps<T>['onChange'])(v);
    }
  };

  return (
    <div className='option-list-container'>
      {label && <h4 className='option-list-label fancy'>{label}</h4>}
      <div className='option-list' role={multiple ? 'group' : 'radiogroup'}>
        {options.map((opt) => (
          <button
            key={opt.value}
            type='button'
            role={multiple ? 'checkbox' : 'radio'}
            aria-checked={isSelected(opt.value)}
            className={`option-list-item ${isSelected(opt.value) ? 'option-list-item-selected' : ''}`}
            onClick={() => handleClick(opt.value)}
          >
            <span className='option-list-indicator' aria-hidden='true' />
            <span className='option-list-text'>
              <span className='option-list-label'>{opt.label}</span>
              {opt.description && (
                <span className='option-list-description'>{opt.description}</span>
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
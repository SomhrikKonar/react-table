import React from "react";
import { ISelectInput } from "../../../../../../../../interafaces/blocks";
import styles from "./styles.module.css";
const View: React.FC<ISelectInput> = ({
  handleChange,
  options,
  value,
  isDisabled,
  icon,
  defaultMessage,
}) => {
  const [focussed, setFocussed] = React.useState<boolean>(false);
  const selectRef = React.useRef<HTMLDivElement>(null);

  const handleFocus = React.useCallback(
    (state: boolean) => () => {
      if (isDisabled || options.length <= 0) return;
      setFocussed(state);
    },
    [isDisabled]
  );

  const onChange = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      handleChange(e);
      setFocussed(false);
      selectRef.current?.blur();
    },
    [handleChange]
  );

  React.useEffect(() => {
    if (!focussed) return;
    const optionRefs = selectRef.current?.childNodes[1].childNodes;
    if (!optionRefs) return;
    for (let i = 0; i < optionRefs?.length; i++) {
      const accessKey = (optionRefs[i] as HTMLDivElement).accessKey;
      if (accessKey === value) {
        (optionRefs[i] as HTMLDivElement).scrollIntoView({
          behavior: "auto",
          block: "center",
        });
        return;
      }
    }
  }, [focussed]);

  const FieldValue = React.useMemo(() => {
    return !value || value === "default" ? defaultMessage || "Show All" : value;
  }, [value]);

  return (
    <div
      ref={selectRef}
      className={`${styles.container} ${
        isDisabled || options.length <= 0 ? styles.disabledContainer : ""
      }`}
      tabIndex={-1}
      onFocus={handleFocus(true)}
      onBlur={handleFocus(false)}
    >
      <div className={styles.field}>
        {icon && <img src={icon} alt="filter-icon" />}
        <div className={styles.value}>{FieldValue}</div>
      </div>
      <div
        className={styles.optionsContainer}
        style={{ display: focussed ? "block" : "none" }}
        onClick={onChange}
      >
        <div
          className={`${styles.option} ${
            value === "default" ? styles.selectedOption : ""
          }`}
          accessKey={"default"}
        >
          All
        </div>
        {options.map((option) => (
          <div
            className={`${styles.option} ${
              value === option ? styles.selectedOption : ""
            }`}
            key={option}
            accessKey={option.toString()}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(View);

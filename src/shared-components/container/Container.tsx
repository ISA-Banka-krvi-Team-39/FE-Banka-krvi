

import classnames from "classnames";

interface ContainerProps {
    className?: string;
    children: React.ReactNode;
  }

const Container: React.FC<ContainerProps> = ({
    className,
    ...props
  }) => {
    return (
        <div className={classnames("px-4 md:px-8 max-w-[1200px] mx-auto",className)}>
            {props.children}
        </div>
    );
  };
  
  export default Container;
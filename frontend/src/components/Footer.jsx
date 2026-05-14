import React from 'react';

const Footer = ({completedTasksCount =0, activeTasksCount =0}) => {
  return <>
    { completedTasksCount + activeTasksCount > 0 && (
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          {
            completedTasksCount >0 && (
              <>
                {completedTasksCount} completed
                {
                  activeTasksCount > 0 && `,  ${activeTasksCount} active`
                }
              </>
            )
          }

            {
            completedTasksCount === 0 && activeTasksCount > 0 && (
              <>
                {activeTasksCount} active
              </>
            )
          }
        </p>

      </div>

    )}
  </>;
};

export default Footer;
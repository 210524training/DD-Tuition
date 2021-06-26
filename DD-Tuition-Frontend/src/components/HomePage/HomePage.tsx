import React from 'react';
type Props = {

}
export const HomePage: React.FC<Props> = (props) => {
    // const user = useAppSelector<UserState>(selectUser);
  
    return (
        <div className="container">
           <form>
             <label>Username</label><input type="text"/>
              <label>Password</label><input type="password"/>
           </form>
        </div>

    );
  };
    
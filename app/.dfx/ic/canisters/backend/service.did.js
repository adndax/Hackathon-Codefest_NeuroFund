export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'fund' : IDL.Func([IDL.Text, IDL.Nat, IDL.Principal], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };

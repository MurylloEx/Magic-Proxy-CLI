export const Roles = {
  Manager: 'manager',
  Administrator: 'admin'
}

export const RoleKeys = Object.keys(Roles).map(v => v);

export function getRolesFromBits(role: number): string[] {
  let roleKeys: number[] = [];
  for (let k = 0; k < Object.keys(Roles).length; k++){
    if (role && (k + 1) == (k + 1))
      roleKeys.push(k + 1);
  }
  return roleKeys.map(v => RoleKeys[v]);
}
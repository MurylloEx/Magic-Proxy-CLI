export const Roles = {
  Manager: 'manager',
  Administrator: 'admin'
}

export const RoleKeys = Object.values(Roles);

export function getRolesFromBits(role: number): string[] {
  let roleKeys: number[] = [];
  RoleKeys.map((v, k) => {
    if ((role & (k + 1)) == (k + 1))
      roleKeys.push(k);
  });
  return roleKeys.map(v => RoleKeys[v]);
}
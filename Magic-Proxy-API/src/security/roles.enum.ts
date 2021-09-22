export const Roles = {
  Manager: 'manager',
  Administrator: 'admin'
}

export const RoleValues = Object.values(Roles);

export function getRolesFromBits(role: number): string[] {
  let roleKeys: number[] = [];
  RoleValues.map((v, k) => {
    if ((role & 2**k) == 2**k)
      roleKeys.push(k);
  });
  return roleKeys.map(v => RoleValues[v]);
}

export function getBitsFromRoles(roles: string[]): number {
  let roleBits: number[] = roles.map((v, k) => {
    let index = RoleValues.indexOf(v.toLocaleLowerCase());
    return index != -1 ? 2**index : 0;
  })
  return roleBits.reduce((a, b) => a + b, 0);
}

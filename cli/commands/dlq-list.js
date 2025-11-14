import * as dlqRepo from "../../db/repositories/dlqRepo.js";

export const dlqListCommand = () => {
  const items = dlqRepo.list();
  console.log(items);
};

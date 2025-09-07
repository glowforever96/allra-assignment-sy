import { postBusinessNumVerify } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

function useBusinessNumVerify() {
  return useMutation({
    mutationFn: postBusinessNumVerify,
  });
}

export default useBusinessNumVerify;

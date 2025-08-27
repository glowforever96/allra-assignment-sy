import { postSignup } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

function useSignup() {
  return useMutation({
    mutationFn: postSignup,
  });
}

export default useSignup;

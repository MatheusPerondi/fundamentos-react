import { Button, Link as ChakraLink, Field, Flex, Heading, HStack, Image, Input, Stack, Text, VStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { resolve } from "path";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { PasswordInput } from "@/components/ui/password-input";
import { useSession } from "@/contexts/sessionContext";
import loginImage from "../../public/assets/8da4f1d7ff459ac79a3bbd831ac3e846f325d9e7.gif";

const signInFormSchema = z.object({
    email: z.email().nonempty("Obrigatório"),
    password: z.string().nonempty("Obrigatório").min(8, "A senha deve ter pelo menos 8 caraceres"),
});



type SignInFormData = z.infer<typeof signInFormSchema>;

export default function Login() {

    const { user, singIn } = useSession();

    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(signInFormSchema),
    });

    async function handleSigIn({ email, password }: SignInFormData) {
        const promise = new Promise<void>(async (resolve, reject) => {
            try {
                await singIn({ email, password });
                resolve();
                router.push("/")
            } catch (error) {
                console.log(error);
                reject();
            }
        })
    }

    useEffect(() => {
        console.log("User: ", user)
    }, [user])

    return (
        <Flex w="100vw" h="100vh">
            <Flex w="50%" bg="#2C73EB" justifyContent="center" alignItems="center">
                <Image w={500} h={500} src={loginImage.src} />
            </Flex>
            <VStack w="50%" justify="center">
                <Stack>
                    <Heading as="h1" color="black" fontSize="3xl" fontWeight="bold" > Login </Heading>

                    <Text color="gray.500" fontWeight="normal" fontSize="lg"> Se você já é membro pode fazer login com seu endereço de email </Text>

                    <VStack as="form" onSubmit={handleSubmit(handleSigIn)} align="flex-start" gap={6} mt={10}>

                        <Field.Root invalid={!!errors.email}>
                            <Field.Label color="gray.500" fontSize="md">
                                Email
                            </Field.Label>

                            <Input h="15" borderRadius="md" colorPalette="blue" color="gray.500"  {...register("email")} />
                            <Field.ErrorText>
                                {errors.email?.message}
                            </Field.ErrorText>
                        </Field.Root>

                        <Field.Root color="gray.500" fontSize="md" invalid={!!errors.email}>
                            <Field.Label>
                                Senha
                            </Field.Label>

                            <PasswordInput type="password" h="15" borderRadius="md" colorPalette="blue" color="gray.500" {...register("password")} />

                            <Field.ErrorText>
                                {errors.password?.message}
                            </Field.ErrorText>
                        </Field.Root>


                        <Checkbox colorPalette="blue" color="gray.500">
                            Lembrar
                        </Checkbox>

                        <Button type="submit" w="full" h="16" borderRadius="md" colorPalette="blue" fontSize="md" fontWeight="medium">
                            Entrar
                        </Button>
                    </VStack>

                    <HStack justify="center" mt={10}>
                        <Text color="gray.500" fontSize="md" fontWeight="medium">
                            Não possui uma conta, clique aqui
                        </Text>
                        <ChakraLink asChild color="blue.500" fontWeight="bold">
                            <NextLink href="/sign-in"> sign-up </NextLink>
                        </ChakraLink>
                    </HStack>

                </Stack>

            </VStack>
        </Flex>
    )
}

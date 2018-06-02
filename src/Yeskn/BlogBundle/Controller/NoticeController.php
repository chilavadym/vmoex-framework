<?php
/**
 * This file is part of project JetBlog.
 *
 * Author: Jake
 * Create: 2018-05-27 12:59:41
 */

namespace Yeskn\BlogBundle\Controller;


use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Yeskn\BlogBundle\Entity\Notice;

class NoticeController extends Controller
{
    /**
     * @Route("/my-notices", name="my_notices")
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function myNoticesAction()
    {
        $user = $this->getUser();

        if (empty($user)) {
            return new JsonResponse('user not login');
        }

        $notices = $this->getDoctrine()->getRepository('YesknBlogBundle:Notice')
            ->findBy(['pushTo' => $user]);

        return $this->render('@YesknBlog/notices.html.twig', [
            'notices' => $notices
        ]);
    }
}
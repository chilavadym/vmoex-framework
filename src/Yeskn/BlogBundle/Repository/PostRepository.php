<?php

namespace Yeskn\BlogBundle\Repository;
use Doctrine\ORM\EntityRepository;
use Yeskn\BlogBundle\Entity\Post;

/**
 * PostRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class PostRepository extends EntityRepository
{
    /**
     * @return Post[]
     */
    public function queryLatest()
    {
        return $this->getEntityManager()
            ->createQuery('
                SELECT p
                FROM YesknBlogBundle:Post p
                WHERE p.createdAt <= :now
                ORDER BY p.createdAt ASC
            ')
            ->setParameter('now',new \DateTime())
            ->getResult()
            ;
    }

    public function testQuery()
    {
        return $this->createQueryBuilder('e')
            ->leftJoin('e.author','o')
            ->getQuery()
            ->getResult();
    }

    public function findLast($page =1)
    {
        //$page = new DoctrineORMAdampter();
    }
}

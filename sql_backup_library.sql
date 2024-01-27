PGDMP         #                 |            library    15.2    15.2                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    28093    library    DATABASE     ~   CREATE DATABASE library WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Indonesia.1252';
    DROP DATABASE library;
                postgres    false            �            1259    28100    books    TABLE     �   CREATE TABLE public.books (
    code character varying(10) NOT NULL,
    title character varying(255) NOT NULL,
    author character varying(255) NOT NULL,
    stock integer DEFAULT 1 NOT NULL
);
    DROP TABLE public.books;
       public         heap    postgres    false            �            1259    28123    borrowedbook    TABLE     ]  CREATE TABLE public.borrowedbook (
    borrowedbookid integer NOT NULL,
    memberid character varying NOT NULL,
    bookid character varying NOT NULL,
    borrowdate timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    returndate timestamp without time zone,
    status character varying(50) DEFAULT 'Borrowed'::character varying
);
     DROP TABLE public.borrowedbook;
       public         heap    postgres    false            �            1259    28122    borrowedbook_borrowedbookid_seq    SEQUENCE     �   CREATE SEQUENCE public.borrowedbook_borrowedbookid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.borrowedbook_borrowedbookid_seq;
       public          postgres    false    217                       0    0    borrowedbook_borrowedbookid_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.borrowedbook_borrowedbookid_seq OWNED BY public.borrowedbook.borrowedbookid;
          public          postgres    false    216            �            1259    28094    members    TABLE     �   CREATE TABLE public.members (
    code character varying(10) NOT NULL,
    membername character varying(255) NOT NULL,
    penaltydate date
);
    DROP TABLE public.members;
       public         heap    postgres    false            n           2604    28126    borrowedbook borrowedbookid    DEFAULT     �   ALTER TABLE ONLY public.borrowedbook ALTER COLUMN borrowedbookid SET DEFAULT nextval('public.borrowedbook_borrowedbookid_seq'::regclass);
 J   ALTER TABLE public.borrowedbook ALTER COLUMN borrowedbookid DROP DEFAULT;
       public          postgres    false    217    216    217                      0    28100    books 
   TABLE DATA           ;   COPY public.books (code, title, author, stock) FROM stdin;
    public          postgres    false    215   �       
          0    28123    borrowedbook 
   TABLE DATA           h   COPY public.borrowedbook (borrowedbookid, memberid, bookid, borrowdate, returndate, status) FROM stdin;
    public          postgres    false    217   �                 0    28094    members 
   TABLE DATA           @   COPY public.members (code, membername, penaltydate) FROM stdin;
    public          postgres    false    214   �                  0    0    borrowedbook_borrowedbookid_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.borrowedbook_borrowedbookid_seq', 64, true);
          public          postgres    false    216            t           2606    28107    books books_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (code);
 :   ALTER TABLE ONLY public.books DROP CONSTRAINT books_pkey;
       public            postgres    false    215            v           2606    28131    borrowedbook borrowedbook_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.borrowedbook
    ADD CONSTRAINT borrowedbook_pkey PRIMARY KEY (borrowedbookid);
 H   ALTER TABLE ONLY public.borrowedbook DROP CONSTRAINT borrowedbook_pkey;
       public            postgres    false    217            r           2606    28099    members members_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_pkey PRIMARY KEY (code);
 >   ALTER TABLE ONLY public.members DROP CONSTRAINT members_pkey;
       public            postgres    false    214            w           2606    28137    borrowedbook fk_book    FK CONSTRAINT     t   ALTER TABLE ONLY public.borrowedbook
    ADD CONSTRAINT fk_book FOREIGN KEY (bookid) REFERENCES public.books(code);
 >   ALTER TABLE ONLY public.borrowedbook DROP CONSTRAINT fk_book;
       public          postgres    false    3188    215    217            x           2606    28132    borrowedbook fk_member    FK CONSTRAINT     z   ALTER TABLE ONLY public.borrowedbook
    ADD CONSTRAINT fk_member FOREIGN KEY (memberid) REFERENCES public.members(code);
 @   ALTER TABLE ONLY public.borrowedbook DROP CONSTRAINT fk_member;
       public          postgres    false    217    3186    214               �   x�%��j�0Dϫ���LMSګ�L���2�ҋl/�!��㿯H����]��}�>�9�jiW�1�O���2I����Lߡ6��l:}L+rB7z��Ј���>'���H�n�v����i�0�n0�)����x�f���Xu%��xcJ�{<���^d��JR�vy����W[��/y
N�7Pb�OZ�b~*c���G      
   7  x�}�=n1���S�V�H�te$H8Ҹ�)bF�\?����3��~CQ�o�_ ����Y�@@r<S?�Ҝ�w_Kb�4���x������rzx==��y9rܠ��ϸ�$jЕ�g��i�k��z�pw�U��A��na�\
*�P	scW�y6D�% VPi{�	Ui
�a4+E�(��L�4K> ZGF�T����+�D�h�ԁ
�n��14Z(1���=ﺆ��V�Rnb᫧J���Q�U�=������Ф�ae�أ�@j�0�UJi�a*&��=֬L�h`�$͡[�p/��ի�����y���H���� K�m�l�'	o߳�(vU��5TE�@^@s� ��T����@����\8����UK��Pr�a&G�qx�z�{{�sy9j�=}?#����0P?]�Ks�f��i����5�dCsӌ)��Q߁����d4KK�����ŢilC)�IKc�Z2�^�W�m(Ӳ��5t���2f���.T-͋*\K*�
�vځ� iȤD�d`P<T�]�x� ��K\��lC��_4�g��������v<��0۶         9   x��500�t�KOO����500�tK-*���9JK�29��Lt�t�̹b���� ���     